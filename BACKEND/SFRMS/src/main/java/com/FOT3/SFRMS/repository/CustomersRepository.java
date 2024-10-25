package com.FOT3.SFRMS.repository;

import com.FOT3.SFRMS.entity.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomersRepository extends JpaRepository<Customers, Integer> {

//    @Query(value = "CALL AddNewCustomer(:firstName, :lastName, :nic, :phoneNumber, :userId)", nativeQuery = true)
//    void addNewCustomer(@Param("firstName") String firstName,
//                        @Param("lastName") String lastName,
//                        @Param("nic") String nic,
//                        @Param("phoneNumber") String phoneNumber,
//                        @Param("userId") int userId);

}
